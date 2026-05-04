import { ActionConfig, ButtonWidget, AURAProject } from '../types';

export interface ActionContext {
  setBusy: () => void;
  setSuccess: (labelOverride?: string) => void;
  setError: (labelOverride?: string) => void;
  setNormal: () => void;
  log: (msg: string) => void;
}

export const executeButtonAction = async (
  project: AURAProject,
  widget: ButtonWidget,
  action: ActionConfig,
  context: ActionContext
) => {
  if (!action.enabled || action.protocol === 'none') {
    return;
  }

  context.setBusy();
  context.log(`Action [${widget.name}]: Executing ${action.protocol}...`);

  try {
    if (action.protocol === 'tcp-simulated') {
      await executeTcpSimulated(action, context);
    } else if (action.protocol === 'http') {
      await executeHttp(action, context);
    } else {
      throw new Error(`Unsupported protocol: ${action.protocol}`);
    }
  } catch (err: any) {
    context.log(`Action [${widget.name}]: Failed - ${err.message}`);
    if (action.onFailState === 'error') {
      context.setError(action.onFailLabelOverride);
    } else if (action.onFailState === 'normal') {
      context.setNormal();
    }
    
    // Auto-revert state after 2 seconds
    setTimeout(() => {
      context.setNormal();
    }, 2000);
  }
};

const executeTcpSimulated = async (action: ActionConfig, context: ActionContext) => {
  context.log(`TCP(sim): Sending to ${action.tcpHost}:${action.tcpPort} [${action.payloadFormat}] ${action.payload}`);
  
  // Simulate network delay
  await new Promise(r => setTimeout(r, 600));
  
  if (action.expectReply) {
    context.log(`TCP(sim): Waiting for reply... timeout ${action.timeoutMs}ms`);
    await new Promise(r => setTimeout(r, 200));
    
    const reply = action.mockReply || '';
    context.log(`TCP(sim): Received reply: ${reply}`);
    
    const matched = matchReply(reply, action.expectedReplyValue, action.expectedReplyMatchType);
    if (!matched) {
      throw new Error(`Reply mismatch. Expected [${action.expectedReplyMatchType}]: ${action.expectedReplyValue}`);
    }
  }

  context.log(`TCP(sim): Success`);
  if (action.onSuccessState === 'success') {
    context.setSuccess(action.onSuccessLabelOverride);
  } else if (action.onSuccessState === 'normal') {
    context.setNormal();
  }
  
  setTimeout(() => context.setNormal(), 2000);
};

const executeHttp = async (action: ActionConfig, context: ActionContext) => {
  context.log(`HTTP: ${action.httpMethod} ${action.url}`);
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), action.timeoutMs || 5000);

  try {
    const res = await fetch(action.url, {
      method: action.httpMethod,
      body: (action.httpMethod === 'POST' || action.httpMethod === 'PUT') ? action.httpBody : undefined,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    clearTimeout(id);
    const text = await res.text();
    context.log(`HTTP: Status ${res.status}`);

    if (!res.ok && !action.expectReply) {
      throw new Error(`HTTP ${res.status}`);
    }

    if (action.expectReply) {
      const matched = matchReply(text, action.expectedReplyValue, action.expectedReplyMatchType);
      if (!matched) {
        throw new Error(`Reply mismatch. Expected [${action.expectedReplyMatchType}]: ${action.expectedReplyValue}`);
      }
    }

    context.log(`HTTP: Success`);
    if (action.onSuccessState === 'success') context.setSuccess(action.onSuccessLabelOverride);
    else if (action.onSuccessState === 'normal') context.setNormal();
    setTimeout(() => context.setNormal(), 2000);

  } catch (err: any) {
    clearTimeout(id);
    if (err.name === 'AbortError') throw new Error('Timeout');
    throw err;
  }
};

const matchReply = (reply: string, expected: string, matchType: string): boolean => {
  if (matchType === 'equals') return reply === expected;
  if (matchType === 'contains') return reply.includes(expected);
  if (matchType === 'regex') {
    try { return new RegExp(expected).test(reply); } catch { return false; }
  }
  if (matchType === 'containsHex') {
    const rx = reply.replace(/\s+/g, '').toLowerCase();
    const ex = expected.replace(/\s+/g, '').toLowerCase();
    return rx.includes(ex);
  }
  return false;
};

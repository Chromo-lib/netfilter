import React, { useCallback, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const ruleExample = localStorage.getItem('rules') || `[
  {
    "id": 61,
    "priority": 2,
    "action": {
      "type": "block"
    },
    "condition": {
      "requestDomains": ["ghost.io","chatlio.com","crisp.chat","vimkit.io","peer5.com"],
      "domainType": "thirdParty",
      "resourceTypes": ["script","image","object","xmlhttprequest","ping","media","websocket","webtransport","csp_report"]
    }
  }
]`;

export default function FormRules({ rules }) {  
  const [message, setMessage] = useState<string>();
  const [editorValue, setEditorValue] = useState<string>(ruleExample)

  const onAddRule = useCallback(async (e: any) => {
    e.preventDefault();
    try {
      if (window.confirm('Do you really want to add this rule?')) {
        const nRules = JSON.parse(editorValue);
        const message = e.target.elements[0].value;
        await chrome.runtime.sendMessage({ message, nRules });
        setMessage(`New rules are added successfully`);
      }
    } catch (error) {
      setMessage(error.message)
    }
  }, []);

  const onEditorChange = useCallback((value: any) => {
    setEditorValue(value);
    localStorage.setItem('rules', editorValue);
  }, []);

  const getDynamicRules = useCallback(async () => {
    await chrome.runtime.sendMessage({ message: 'getDynamicRules' });
  }, []);

  const getSessionRules = useCallback(async () => {
    await chrome.runtime.sendMessage({ message: 'getSessionRules' });
  }, []);

  const getEnabledRulesets = useCallback(async () => {
    await chrome.runtime.sendMessage({ message: 'getEnabledRulesets' });
  }, []);

  return <aside className="h-100">
    <div className="w-100">
      {rules.length > 0 && <pre className="bordered">{JSON.stringify(rules, null, 2)}</pre>}
      <div className="w-100 grid-3">
        <button className="w-100" title="Get Session Rules" onClick={getSessionRules}>Session Rules</button>
        <button className="w-100" title="Get Dynamic Rules" onClick={getDynamicRules}>Dynamic Rules</button>
        <button className="w-100" title="Get Enabled Rulesets" onClick={getEnabledRulesets}>Enabled Rulesets</button>
      </div>
    </div>

    <form className="mt-1" onSubmit={onAddRule}>
      <CodeMirror
        value={editorValue}
        height="300px"
        extensions={[javascript()]}
        theme={oneDark}
        onChange={onEditorChange}
        className="bordered"
      />

      <small>Note: First 60 ids are reserved.</small>

      <select className="w-100 mb-1 mt-1" name="rules">
        <option value="addDynamicRules">Dynamic Rules</option>
        <option value="addSessionRules">Session Rules</option>
      </select>

      <button type="submit" className="w-100">add Rules</button>
    </form>

    {message && <pre className="bg-dark mt-1">{message}</pre>}

    <footer className='mt-1'>
      <a href="https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest" target="_blank">declarativeNetRequest reference</a>
    </footer>
  </aside>
}
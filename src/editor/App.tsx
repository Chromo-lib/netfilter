import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import FormRules from "./forms/FormRules";
import Snackbar from "./components/Snackbar";
import { WebResponseErrorDetails } from "./types";
import IconTrash from "./icons/IconTrash";
import IconReload from "./icons/IconReload";

export default function App() {
  const [rules, setRules] = useState([]);
  const [message, setMessage]: any = useState();
  const [webResponseErrorDetails, setWebResponseErrorDetails] = useState<WebResponseErrorDetails[]>([]);

  const onReload = () => {
    chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });
  }

  const onClear = () => {
    if (window.confirm('Do you really want to clear storage?')) chrome.runtime.sendMessage({ message: 'clear:webResponseErrorDetails' });
  }

  const onMessages = (request: any, _: any, sendResponse: any) => {
    sendResponse('Editor');
    if (request.rules) setRules(request.rules);
    if (request.webResponseErrorDetails) setWebResponseErrorDetails(request.webResponseErrorDetails);

    return true;
  }

  useEffect(() => {
    // async function onStartup() {
    //   window.port = chrome.runtime.connect({ name: "netfilter-popup" });
    //   const activeTab = await getActiveTab();

    //   if (!activeTab || !activeTab.url || /^(chrome|edge|firefox|addon)/g.test(activeTab.url)) return;

    //   window.port.postMessage({
    //     message: 'get:webResponseErrorDetails',
    //     url: activeTab.url,
    //     tabId: activeTab.id
    //   });
    // }

    chrome.runtime.sendMessage({ message: 'get:webResponseErrorDetails' });
    chrome.runtime.onMessage.addListener(onMessages);
    return () => {
      chrome.runtime.onMessage.removeListener(onMessages);
    }
  }, []);

  return <>
    <header className="d-flex justify-between align-center">
      <div>Web Response Error Details ({webResponseErrorDetails.length})</div>
      <div className="d-flex">
        <button className="bg-green" onClick={onReload}><IconReload clx="mr-1" />reload</button>
        <button className="bg-red" onClick={onClear}><IconTrash clx="mr-1" />clear</button>
      </div>
    </header>

    <main>
      <ul>
        {webResponseErrorDetails.reverse().map(r => <li className="box" key={r.requestId}>
          <div className="d-flex align-center mb-1">
            <span className={'tag ' + r.type}>{r.type}</span>
            <h4 className="m-0 ml-1 truncate">{r.url}</h4>
          </div>
          <div className="d-flex justify-between align-center gray">
            <div>
              <span className="mr-3">{r.initiator}</span>
              <span className="mr-3">{r.method}</span>
              <span className="mr-3">{r.ip}</span>
              {r.timeStamp && <span className="mr-3">{new Date(r.timeStamp).toISOString().slice(0, 19)}</span>}
              <span>{r.statusCode}</span>
            </div>
            <span>{r.error}</span>
          </div>
        </li>)}
      </ul>
    </main>

    <Sidebar>
      <FormRules rules={rules} />
    </Sidebar>

    <Snackbar text={message} setMessage={setMessage} />
  </>
}

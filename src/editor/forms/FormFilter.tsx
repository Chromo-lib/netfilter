import React from 'react'

export default function FormFilter({ onSearch }) {
  return <form className="w-100" onSubmit={onSearch}>
    <div className="mb-1">
      <label htmlFor="section">Section</label>
      <select className="w-100 mt-1" name="section" title="section">
        <option value="webRequestBodyDetails">Request Body Details</option>
        <option value="webResponseErrorDetails">Response Error Details</option>
      </select>
    </div>

    <div className="mb-1">
      <label htmlFor="initiator">initiator or url</label>
      <input className="w-100 mt-1" type="search" name="initiator" id="initiator" placeholder="google.com" />
    </div>

    <div className='w-100 grid-2'>
      <div className="mb-1">
        <label htmlFor="type">type</label>
        <select className="w-100 mt-1" name="type" title="type">
          <option value="null">all</option>
          <option value="xmlhttprequest">xmlhttprequest</option>
          <option value="script">script</option>
          <option value="image">image</option>
          <option value="font">font</option>
          <option value="stylesheet">stylesheet</option>
          <option value="main_frame">main_frame</option>
          <option value="sub_frame">sub_frame</option>
          <option value="other">other</option>
        </select>
      </div>

      <div className="mb-1">
        <label htmlFor="method">method</label>
        <select className="w-100 mt-1" name="method" title="method">
          <option value="null">all</option>
          <option value="HEAD">HEAD</option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
          <option value="PUT">PUT</option>
        </select>
      </div>
    </div>

    <button className="w-100" type="submit">filter</button>
  </form>
}

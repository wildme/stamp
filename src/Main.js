export function InboxHeader() {
    return <h3>Inbox</h3>
}

export function InboxMain() {
    return (
        <div className="main">
          <div className="mainPanel">
            <a href="/inbox/new">New</a>
            <a href="/inbox/edit">Edit</a>
          </div>
          <div className="mainTable">
            <table>
              <tr id="topRow">
                <th>#</th>
                <th>Subject</th>
                <th>Sender</th>
                <th>Date</th>
                <th>User</th>
                <th>Note</th>
                <th>File</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Test</td>
                <td>Big Corp.</td>
                <td>Konstantin</td>
                <td>1-01-2021</td>
                <td>test test</td>
                <td>Document.doc</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Test2</td>
                <td>Ajax</td>
                <td>Konstantin</td>
                <td>1-01-2021</td>
                <td>test2 test</td>
                <td>Document.docx</td>
              </tr>
            </table>
          </div>  
          </div>
    );
}

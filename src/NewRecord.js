export function NewInbox() {
    return (
        <div className="addRecord">
          <label for="subj"><b>Subject</b></label>
          <input type="text" name="subj"/>

          <label for="from"><b>Sender</b></label>
          <input type="text" name="from"/>

          <label for="date"><b>Date</b></label>
          <input type="text" name="date"/>

          <label for="user"><b>User</b></label>
          <input type="text" name="user"/>
          
          <label for="note"><b>Note</b></label>
          <input type="text" name="Note"/>

          <label for="file"><b>File</b></label>
          <input type="text" name="file"/>
        
          <button type="submit" id="submit">Add</button>
        </div>
    );
}

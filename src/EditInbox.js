import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { inbox_edit, outbox_edit } from './redux/actions.js';
import { connect } from 'react-redux';
import { InputAttrs as attrs } from './InputAttrs.js';
import { InputField } from './InputFields.js';

const EditInbox = ({inbox, dispatch}) => {
    const { id } = useParams();
    const prev = inbox.find(x => x.id == id);
    const [subj, setSubj] = useState(prev.subj);
    const [from, setFrom] = useState(prev.from);
    const [note, setNote] = useState(prev.note);
    
    const handleEditInbox = (e) => {
        e.preventDefault();
        dispatch(
            inbox_edit(id, {
                subj: subj,
                from: from,
                note: note
            })
        );
        setSubj("");
        setFrom("");
        setNote("");
    };

    return (
        <div className="addRecord">
        <InputField attrs={attrs.inbox.filter(x => x.name == "subj")[0]}
                    setter={setSubj}
                    value={subj}
        />
        <InputField attrs={attrs.inbox.filter(x => x.name == "from")[0]}
                    setter={setFrom}
                    value={from}
                    auto={true}
        />
        <InputField attrs={attrs.inbox.filter(x => x.name == "note")[0]}
                    setter={setNote}
                    value={note}
        />
        <button type="submit" onClick={(e) => handleEditInbox(e)} >Update</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { inbox } = state;
    return { inbox: inbox }
}
export default connect(mapStateToProps)(EditInbox);

import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { inbox_edit, outbox_edit } from './redux/actions.js';
import { connect } from 'react-redux';
import { InputAttrs as attrs } from './InputAttrs.js';
import { InputField } from './InputFields.js';

const EditInbox = ({inbox, outbox, dispatch}) => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const box = /(in|out)box/.exec(pathname)[0];
    const currentTable = box == 'inbox' ? inbox : outbox;
    const prev = currentTable.find(x => x.id == id);
    const [subj, setSubj] = useState(prev.subj);
    const [from, setFrom] = useState(prev.from || prev.to);
    const [note, setNote] = useState(prev.note);
    
    const handleEditInbox = (e) => {
        e.preventDefault();
        if (/^\/inbox\//.test(pathname)) {
            dispatch(
                inbox_edit(id, {
                    subj: subj,
                    from: from,
                    note: note
                })
            );
        } else if (/^\/outbox\//.test(pathname)) {
            dispatch(
                outbox_edit(id, {
                    subj: subj,
                    to: from,
                    note: note
                })
            )
        }
        setSubj("");
        setFrom("");
        setNote("");
    };

    return (
        <div className="addRecord">
        <InputField attrs={attrs[`${box}`].filter(x => x.name == "subj")[0]}
                    setter={setSubj}
                    value={subj}
        />
        <InputField attrs={attrs[`${box}`].filter(x => x.name == "from" || x.name == "to")[0]}
                    setter={setFrom}
                    value={from}
                    auto={true}
        />
        <InputField attrs={attrs[`${box}`].filter(x => x.name == "note")[0]}
                    setter={setNote}
                    value={note}
        />
        <button type="submit" onClick={(e) => handleEditInbox(e)} >Update</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { inbox, outbox } = state;
    return { inbox: inbox, outbox: outbox }
}

export default connect(mapStateToProps)(EditInbox);

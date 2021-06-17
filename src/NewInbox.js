import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { inbox_add, outbox_add } from './redux/actions.js';
import { connect } from 'react-redux';
import { InputAttrs as attrs } from './InputAttrs.js';
import { InputField } from './InputFields.js';

const NewInbox = ({user, dispatch}) => {
    const { pathname } = useLocation();
    const box = /(in|out)box/.exec(pathname)[0];
    const [subj, setSubj] = useState("");
    const [from, setFrom] = useState("");
    const date = new Date().toISOString();
    const added = user.name;
    const [note, setNote] = useState("");
    
    const handleAddInbox = (e) => {
        e.preventDefault();
        if (/^\/inbox\//.test(pathname)) {
            dispatch(
                inbox_add({
                    subj: subj,
                    from: from,
                    date: date,
                    added: added,
                    note: note
                })
            );
        } else if (/^\/outbox\//.test(pathname)) {
            dispatch(
                outbox_add({
                    subj: subj,
                    to: from,
                    date: date,
                    added: added,
                    note: note
                })
            );
        }

        setSubj("");
        setFrom("");
        setNote("");
    };

    return (
        <div className="add-record">
            <div className="record-input">
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
                <button type="submit" onClick={(e) => handleAddInbox(e)} >Add</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user: user }
}

export default connect(mapStateToProps)(NewInbox);

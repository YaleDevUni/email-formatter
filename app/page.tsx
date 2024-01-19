"use client";
import Image from "next/image";
import { ChangeEvent, SetStateAction, use, useEffect, useState } from "react";
import { text } from "stream/consumers";

export default function Home() {
  const defaultCheckedValueGroup1 = "T4";
  const [clientCorpName, setClientCorpName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [t4checked, setT4Checked] = useState<boolean>(true);
  const [t5checked, setT5Checked] = useState<boolean>(false);
  const [t4t5checked, setT4T5Checked] = useState<boolean>(false);
  const [taxCopyChecked, setTaxCopyChecked] = useState<boolean>(true);
  const [clientCopyChecked, setClientCopyChecked] = useState<boolean>(false);
  const [textToModify, setTextToModify] = useState<string>("");
  const [selectedValueGroup1, setSelectedValueGroup1] = useState<string | null>(
    defaultCheckedValueGroup1
  );
  const handleTaxCopyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientCopyChecked(false);
    setTaxCopyChecked(e.target.checked);
  };
  const handleClientCopyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaxCopyChecked(false);
    setClientCopyChecked(e.target.checked);
  };
  const handleT4Change = (e: ChangeEvent<HTMLInputElement>) => {
    setT5Checked(false);
    setT4T5Checked(false);
    setT4Checked(e.target.checked);
  };
  const handleT5Change = (e: ChangeEvent<HTMLInputElement>) => {
    setT4Checked(false);
    setT4T5Checked(false);
    setT5Checked(e.target.checked);
  };
  const handleT4T5Change = (e: ChangeEvent<HTMLInputElement>) => {
    setT4Checked(false);
    setT5Checked(false);
    setT4T5Checked(e.target.checked);
  };
  const handleSetTitle = () => {
    let s = "";
    if (t4checked) {
      s = "Corporation. - E-Package for T4 2023 & Invoice T4";
    } else if (t5checked) {
      s = "Corporation. - E-Package for T5 2023, & Invoice T5";
    } else if (t4t5checked) {
      s = "E-Package for T4 2023, T5 2023, & Invoice Both";
    }
    const clientOrCorpName = clientCorpName ? clientCorpName : clientName;
    s = clientOrCorpName + " " + s;
    setTitle(s);
  };
  useEffect(() => {
    handleSetTitle();
  }, [t4checked, t5checked, t4t5checked]);
  const handleClientName = (e: ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
    handleSetTitle();
    formatText();
  };
  const handleClientCorpName = (e: ChangeEvent<HTMLInputElement>) => {
    setClientCorpName(e.target.value);
    handleSetTitle();
    formatText();
  };
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const formatText = () => {
    let tType = "";
    let taxCopy = "";
    if (t4checked) {
      tType = "T4";
    } else if (t5checked) {
      tType = "T5";
    }
    if (taxCopyChecked) {
      taxCopy = ` • One copy of the ${tType} 2022 Summary & Slips to sign (Tax Copy),\n`;
    }
    setText(
      `Dear ${clientName}, \n\n We enclose the following:\n\n • One copy of the ${tType} 2022 Summary & Slips (Client’s Copy) for your file, \n${taxCopy} • Invoice for services performed.\n\nThe tax copy will be efiled with the Canada Revenue Agency accordingly before February 29, 2024.\n\nWe have retained a copy of the T5 2023 slip for you for the preparation of your personal income tax return. `
    );
  };
  const formatTitle = () => {
    setText("");
  };
  useEffect(() => {
    formatText();
  }, [taxCopyChecked, clientCopyChecked, t4checked, t5checked, t4t5checked]);
  useEffect(() => {
    formatTitle();
    formatText();
  }, [clientName, clientCorpName]);
  return (
    <div className="flex">
      <div>
        <h1>Email formatter for client. Designed By Josh Kim</h1>
        <div className="flex">
          <div>Client Corporation Name:</div>
          <input
            className="border-solid border-2 rounded-md"
            type="text"
            placeholder="Enter client name..."
            value={clientCorpName}
            onChange={handleClientCorpName}
          />
        </div>
        <div className="flex">
          <div>Client Name:</div>
          <input
            className="border-solid border-2 rounded-md"
            type="text"
            placeholder="Enter client name..."
            value={clientName}
            onChange={handleClientName}
          />
        </div>

        <div className="flex gap-5">
          <label>
            <input
              type="radio"
              value="T4"
              checked={t4checked}
              onChange={handleT4Change}
            />
            T4
          </label>
          <label>
            <input
              type="radio"
              value="T5"
              checked={t5checked}
              onChange={handleT5Change}
            />
            T5
          </label>
          <label>
            <input
              type="radio"
              value="T4/T5"
              checked={t4t5checked}
              onChange={handleT4T5Change}
            />
            T4/T5
          </label>
        </div>
        <hr />
        <div className="flex gap-5">
          <label>
            <input
              type="radio"
              value="taxCopy"
              checked={taxCopyChecked}
              onChange={handleTaxCopyChange}
            />
            Tax Copy
          </label>
          <label>
            <input
              type="radio"
              value="clientCopy"
              checked={clientCopyChecked}
              onChange={handleClientCopyChange}
            />
            Client Copy
          </label>
        </div>
      </div>
      <div
        style={{
          borderLeft: "1px solid #ddd",
          height: "100vh",
          marginLeft: "20px",
          marginRight: "10px",
        }}
      ></div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <input
            className=" border-solid border-2 w-[50vw]"
            value={title}
            onChange={handleTitleChange}
          />
          <button
            className=" rounded-md px-2 bg-black text-white"
            onClick={() => {
              navigator.clipboard.writeText(title);
            }}
          >
            Copy
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <textarea
            className=" border-solid border-2 h-[90vh] w-[50vw]"
            value={text}
            onChange={handleTextChange}
          ></textarea>
          <button
            className=" rounded-md px-2 bg-black text-white h-28"
            onClick={() => {
              navigator.clipboard.writeText(text);
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
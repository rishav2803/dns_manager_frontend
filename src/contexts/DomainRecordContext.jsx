import React, { useState, useEffect, useContext } from "react";

//Create the context
export const DomainRecordContext = React.createContext();

export function DomainRecordProvider({ children }) {
  const [domain,setDomain] = useState([]);
  const [record,setRecord]=useState([]);

  function clearHandler(){
    setDomain([]);
    setRecord([]);
  }

  function addSingleRecords(record){
    setRecord((prevRecord)=>{
      return [record,...prevRecord]
    });
  }

  function getRecordTypes(){
    console.log(domain);
  }

  function deleteDomainRecord(recordName,recordType){
    const newRecords=record.filter(rc=>rc.name!=recordName || rc.type!=recordType)
    setRecord(newRecords);
  }

  function addMultiRecords(record){
    console.log(record);
    setRecord((prevRecord)=>{
      return [...record,...prevRecord]
    });
  }

  function addSingleDomain(domainName){
    console.log(domainName);
    setDomain((domain)=>{
      return [domainName,...domain];
    });
  }

  function addMultipleDomain(list){
    setDomain((domain)=>{
      return [...list,...domain];
    });
  }

  function addMultiDomain(list){
    const domainList=list.userHostedZones;
    setDomain((domain)=>{
      return [...domainList,...domain];
    });
  }


  const value = {
    addMultiDomain,
    addSingleDomain,
    addSingleRecords,
    addMultiRecords,
    addMultipleDomain,
    domain,
    clearHandler,
    deleteDomainRecord,
    getRecordTypes,
    record
  };

  return (
    <DomainRecordContext.Provider value={value}>
      {children}
    </DomainRecordContext.Provider>
  );
}

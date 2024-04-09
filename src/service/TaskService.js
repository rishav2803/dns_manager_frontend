import {
  CREATE_HOSTED_ZONE,
  GET_HOSTED_ZONES,
  GET_RECORDS,
  CREATE_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,
} from "../constants/url";

export async function getAllRecords(domainName, domainId) {
  try {
    const response = await fetch(`${GET_RECORDS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domainName, domainId }),
    });

    if (!response.ok) {
      alert("Failed To fetch Domain Records");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching domain records:", error);
    throw error;
  }
}

export async function createSingleRecord(record, domainId, domainName) {
  try {
    console.log(domainId, domainName);
    const response = await fetch(`${CREATE_RECORD}/single`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mssg: record,
        domainId: domainId,
        domainName: domainName,
      }),
    });

    if (!response.ok) {
      alert("Failed to create Record");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating domain:", error);
    throw error;
  }
}

export async function updateRecord(
  domainId,
  domainName,
  oldRecordName,
  recordName,
  type,
  ttl,
  values
) {
  try {
    console.log(oldRecordName);
    const response = await fetch(`${UPDATE_RECORD}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domainId,
        oldRecordName: oldRecordName.split(".")[0],
        domainName,
        recordName: recordName.split(".")[0],
        type,
        ttl,
        values,
      }),
    });

    if (!response.ok) {
      alert("Failed to update domain");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating domain:", error);
    throw error;
  }
}

export async function deleteRecord(
  domainId,
  recordName,
  recordType,
  ttl,
  values
) {
  try {
    const response = await fetch(`${DELETE_RECORD}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domainId, recordName, recordType, ttl, values }),
    });

    if (!response.ok) {
      alert("Failed to delete domain");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating domain:", error);
    throw error;
  }
}

export async function createMultipleRecords(recordList, domainId, domainName) {
  try {
    const response = await fetch(`${CREATE_RECORD}/multiple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recordList: recordList.records,
        domainId,
        domainName,
      }),
    });

    if (!response.ok) {
      alert("Failed to create records");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating domain:", error);
    throw error;
  }
}

export async function createMultipleDomain(domainList, user_id) {
  try {
    const response = await fetch(`${CREATE_HOSTED_ZONE}/multiple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domainList, user_id: user_id }),
    });

    if (!response.ok) {
      alert("Failed to create domains");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating domain:", error);
    throw error;
  }
}

export async function createSingleDomain(domain, user_id) {
  try {
    const response = await fetch(`${CREATE_HOSTED_ZONE}/single`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mssg: domain, user_id: user_id }),
    });

    if (!response.ok) {
      alert("Failed to create domain");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating domain:", error);
    throw error;
  }
}

export async function getAllDomainRecordTypes(user_id) {
  try {
    const response = await fetch(`${GET_HOSTED_ZONES}/${user_id}/type`);

    if (!response.ok) {
      alert("Failed to fetch");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching", error);
    throw error;
  }
}

export async function getAllDomains(user_id) {
  try {
    const response = await fetch(`${GET_HOSTED_ZONES}/${user_id}`);

    if (!response.ok) {
      alert("Failed to fetch");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching", error);
    throw error;
  }
}

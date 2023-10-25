const BASE_URL = "http://tbankonline.com/SMUtBank_API/Gateway";

interface TxHeader {
  userID: string;
  PIN: string;
  OTP: string;
}

interface BillPayment extends TxHeader {
  accountFrom: string;
  accountTo: string;
  transactionAmount: number;
  transactionReferenceNumber: string;
  narrative: string;
}

export const billPayment = async ({
  userID,
  PIN,
  OTP,
  accountFrom,
  accountTo,
  transactionAmount,
  transactionReferenceNumber,
  narrative,
}: BillPayment) => {
  const headerObj = {
    Header: {
      serviceName: "billPayment",
      userID,
      PIN,
      OTP,
    },
  };

  const contentObj = {
    Content: {
      accountFrom,
      accountTo,
      transactionAmount,
      transactionReferenceNumber,
      narrative,
    },
  };

  const res = await fetch(
    `${BASE_URL}?Header=${JSON.stringify(headerObj)}&Content=${JSON.stringify(
      contentObj
    )}`
  );

  const data = await res.json();
  let errorText = data.Content.ServiceResponse.ServiceRespHeader.ErrorText;
  if (errorText != "invocation success") {
    throw new Error(errorText);
  }

  return data;
};

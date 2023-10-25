const BASE_URL = "http://tbankonline.com/SMUtBank_API/Gateway";

interface TxHeader {
  userID: string;
  PIN: string;
  OTP: string;
}

interface BillPaymentParams extends TxHeader {
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
}: BillPaymentParams) => {
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
  if (errorText != "invocation successful") {
    throw new Error(errorText);
  }

  return data;
};

interface DepositAccountBalanceParams extends TxHeader {
  accountID: string;
}

export const getDepositAccountBalance = async ({
  userID,
  PIN,
  OTP,
  accountID,
}: DepositAccountBalanceParams) => {
  const headerObj = {
    Header: {
      serviceName: "getDepositAccountBalance",
      userID,
      PIN,
      OTP,
    },
  };

  const contentObj = {
    Content: {
      accountID,
    },
  };

  const res = await fetch(
    `${BASE_URL}?Header=${JSON.stringify(headerObj)}&Content=${JSON.stringify(
      contentObj
    )}`
  );

  const data = await res.json();
  let errorText = data.Content.ServiceResponse.ServiceRespHeader.ErrorText;
  if (errorText != "invocation successful") {
    throw new Error(errorText);
  }

  return data;
};

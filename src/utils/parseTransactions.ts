export type Transaction = {
  id?: string;
  transaction_date: Date;
  value_date: Date;
  details: string;
  transaction_no: string;
  amount: number;
  type: string;
  balance: number;
  transaction_time: string;
};

export function parseKotakStatement(text: string): Transaction[] {
  const regex =
    /(\d+)\s+(\d{1,2} \w{3} \d{4})\s+(\d{1,2}:\d{2} [APM]{2})\s+(\d{1,2} \w{3} \d{4})\s+(.+?)\s+([+-]\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s+(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;

  const matches = [];
  let match;
  let serial = 1;

  while ((match = regex.exec(text)) !== null) {
    const amountStr = match[6];
    const balanceStr = match[7];
    const type = amountStr.startsWith("+") ? "CREDIT" : "DEBIT";

    matches.push({
      transaction_no: String(serial++),
      transaction_date: new Date(match[2]),
      transaction_time: match[3],
      value_date: new Date(match[4]),
      details: match[5].trim(),
      amount: parseFloat(amountStr.replace(/,/g, "")),
      balance: parseFloat(balanceStr.replace(/,/g, "")),
      type,
    });
  }

  console.log({ matches });

  return matches;
}

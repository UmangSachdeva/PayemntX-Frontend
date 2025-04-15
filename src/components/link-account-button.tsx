import { useLinkBankAccount } from "@/api/mutations/payment";
import { DropdownItem } from "@heroui/dropdown";
import { useState } from "react";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from "react-plaid-link";

function LinkAccountButton() {
  //   const { mutateAsync: linkAccount, isPending } = useLinkBankAccount();
  //   const [linkToken, setLinkToken] = useState<string | null>(null);

  //   const config: PlaidLinkOptions = {
  //     token: linkToken,
  //     onSuccess: () => {},
  //   };

  //   //   const { open } = usePlaidLink(config);

  //   const createLinkToken = async () => {
  //     if (!isPending) {
  //       const token = await linkAccount();

  //       setLinkToken(token.data.link_token);
  //     }
  //   };

  //   const handleBankAccountLink = async () => {
  //     if (!isPending && !linkToken) {
  //       await createLinkToken();
  //     }
  //     // if (ready) {
  //     //   open();
  //     // }
  //   };

  return <button key="link_bank_account">Link Bank Account</button>;
}

export default LinkAccountButton;

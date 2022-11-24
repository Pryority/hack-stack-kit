import type { NextPage } from "next";
import { gql, useMutation, useQuery } from "urql";

import {
  AccountDocument,
  ConnectDocument,
  MintDocument,
  TransfersDocument,
} from "../.graphclient";

const Home: NextPage = () => {
  const [{ data, fetching, error }] = useQuery({
    query: TransfersDocument,
  });

  const [connectResult, connect] = useMutation(ConnectDocument);
  const [mintResult, mint] = useMutation(MintDocument);

  const result = useQuery({ query: AccountDocument });
  const account = result[0]?.data?._ethereum?.account;

  const doConnect = async () => {
    await connect();
    console.log(`Connected ${account}!`, connectResult);
  };

  const doMint = async () => {
    await mint();
    console.log("Minted!");
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-start bg-slate-50">
      <div className="flex flex-col h-full w-full items-center py-24">
        {account ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="font-bold">{account}</div>
            <button 
              onClick={doMint}
              className="buy-btn"
            >
              Mint
            </button>
          </div>
        ) : (
          <button 
            onClick={doConnect}
            className="connect-btn"
          >
            Connect
          </button>
        )}
      </div>
      {data?.transfers.map((transfer: any) => (
        <div key={transfer.id} className="grid grid-cols-2 order-last w-full items-center max-w-xl py-1">
          <div className="flex w-full justify-center">
            <div className="flex flex-col space-y-[-8px]">
              <h3 className="text-sm font-medium uppercase tracking-wider cursor-default">From</h3>
              <p className="cursor-pointer">{`${transfer.from.substring(4, 0)}...${transfer.from.substring( transfer.from.length - 4, transfer.from.length)}`}</p>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div className="flex flex-col space-y-[-8px]">
              <h3 className="text-sm font-medium uppercase tracking-wider cursor-default">To</h3>
              <p className="cursor-pointer">{`${transfer.to.substring(4, 0)}...${transfer.to.substring( transfer.to.length - 4, transfer.to.length)}`}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

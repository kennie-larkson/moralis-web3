import Moralis from "moralis";
export default async function getEtherBalance (address, chain) {

    const nativeBalance = await Moralis.default.EvmApi.account.getNativeBalance({address,chain})
    const native = nativeBalance.result.balance.ether

    return { native }
}
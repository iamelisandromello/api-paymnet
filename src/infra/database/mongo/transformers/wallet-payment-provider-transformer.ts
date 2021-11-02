export const walletPaymentProviderTransformer = {
  map: (data: any): any => {
    const [{
      wallet: {
        payment_provider_id: paymentProviderId,
        token: tokenCard
      }
    }] = data
    return { paymentProviderId, tokenCard }
  }
}

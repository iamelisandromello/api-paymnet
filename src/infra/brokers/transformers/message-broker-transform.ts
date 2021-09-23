export const MessageTokenCardTransform = (message: any): any => {
  const data = JSON.parse(message.toString())
  return {
    token: data?.token
  }
}

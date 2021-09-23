export interface CheckCard {
  checkByNumber: (cardNumber: number) => Promise<CheckCard.Result>
}

export namespace CheckCard {
  export type Result = boolean
}

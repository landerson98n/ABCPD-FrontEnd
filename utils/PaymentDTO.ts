type PaymentDTO = {
  value?: string

  holderName?: string

  number?: string

  expiryMonth?: string

  expiryYear?: string

  ccv?: string

  remoteIp?: string

  billingType?: string
}

export default PaymentDTO;

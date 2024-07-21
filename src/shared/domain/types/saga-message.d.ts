type SagaMessageModel = {
  uuid: string;
  success: boolean;
  data: object | null;
  datetime: number;
};

export default SagaMessageModel;

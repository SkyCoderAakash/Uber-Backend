const CreateResponse = ({
  success = true,
  message = "",
  data = null,
  statusCode = 200,
} = {}) => {
  return {
    success,
    message,
    data,
    statusCode,
    timestamp: new Date().toISOString(),
  };
};

export default CreateResponse;

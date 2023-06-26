const requestToEvent = (request) => {
  console.log("test")
    const event = {
      headers: request.headers,
      queryStringParameters: request.query,
      body: request.body,
      pathParameters: request.params || {},
    }
    return event;
}

module.exports = requestToEvent;

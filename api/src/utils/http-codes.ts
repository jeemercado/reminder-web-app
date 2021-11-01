export const HTTP_CODE = {
  OK: 200,

  /** The server could not understand the request due to invalid syntax. */
  BAD_REQUEST: 400,

  /** Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response. */
  UNAUTHORIZED: 401,

  /** The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the server. */
  FORBIDDEN: 403,

  /** The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web. */
  METHOD_NOT_ALLOWED: 404,
};

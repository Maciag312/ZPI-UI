var authorizatioSignInButton = document.querySelector(".authsec_sign_in");
var host = authorizatioSignInButton.getAttribute("host");
var clientId = authorizatioSignInButton.getAttribute("client_id");
var redirectURI = window.location.href;

if (authorizatioSignInButton.getAttribute("redirect_uri")) {
  redirectURI = authorizatioSignInButton.getAttribute("redirect_uri");
}

const newAuthorizeButton = document.createElement("button");

newAuthorizeButton.setAttribute("type", "button");
newAuthorizeButton.setAttribute("onclick", authorize.name + "()");
newAuthorizeButton.innerHTML = "Authorize!";

authorizatioSignInButton.parentNode.replaceChild(
  newAuthorizeButton,
  authorizatioSignInButton
);

function authorize() {
  const responseTypeParam = "response_type=code";
  const clientIdParam = "client_id=" + clientId;
  const redirectURIParam = "redirect_uri=" + redirectURI;
  const endpoint = "/api/authorize";
  const state = "state=" + "init";

  const url =
    "http://" +
    host +
    endpoint +
    "?" +
    responseTypeParam +
    "&" +
    clientIdParam +
    "&" +
    redirectURIParam +
    "&" +
    state;

  log("authsec", "INFO");
  window.location.href = url;
}

function log(message, level) {
  console.log(level + " [" + new Date().toISOString() + "] - " + message);
}

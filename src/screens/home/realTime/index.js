export function UdpdateMessaging() {}

export  function sendContactRequest(data, Socket) {
  const { email, sendID, senderEmail, senderPicture, senderToken } = data;
  Socket.emit("notification_client_to_server", data, function (res) {
   
  });
}

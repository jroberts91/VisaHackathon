function onVisaCheckoutReady() {
    V.init({
      apikey: "8XLNBQZUQJFZIFGKCH2P21Koq6pvrOmJc17tWwTsNRQVx_e0o",
      encryptionKey: "CYYbhe6AR#GrUAUHhYo90{80qMXS8y0pFqaE5foe",
      paymentRequest: {
        currencyCode: "USD",
        subtotal: "10.00"
      }
    });
  V.on("payment.success", function(payment) {
    document.write("payment.success: \n" + JSON.stringify(payment));
  });
  V.on("payment.cancel", function(payment) {
    document.write("payment.cancel: \n" + JSON.stringify(payment));
  });
  V.on("payment.error", function(payment, error) {
    document.write("payment.error: \n" +
      JSON.stringify(payment) + "\n" +
      JSON.stringify(error));
  });
}
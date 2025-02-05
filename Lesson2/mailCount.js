/* eslint-disable no-multi-str */
// The objective of this practice problem is to build a function that parses a
// string of email data. The function takes an argument that contains the data,
// parses it, then produces two basic statistics about the email:

// The number of email messages found in the string
// The date range of the email messages
// The email messages string has the following characteristics:

// The string contains multiple email messages separated by the delimiter
// string ##||##.

// Each email message has five parts. The delimiter string #/# separates
// the parts.

// The five parts are:

// Sender
// Subject
// Date
// Recipient
// Body
// All five parts occur in the sequence shown above.

// Examples
// You can work with this sample data.

// The sample data file is a JavaScript program snippet that defines a
// variable named emailData. The value of emailData is the data you will
// use for this practice problem. To avoid editor issues (some editors have
//   problems with very long lines), we recommend that you include this file
//   in your HTML, with a script element prior to the script element that
//   contains your code:

// <script src="https://dbdwvr6p7sskw.cloudfront.net/210/files/email_data_v2.js"></script>
// <script>
//   // your code here
// </script>
// See the Preparations chapter in the JavaScript book if you need a refresher
// on using JavaScript from a browser.

// You can download the file and host it locally if you wish.

// function mailCount(emailData) {
//   // ...
// }

// mailCount(emailData);

// // console output

// Count of Email: 5
// Date Range: Sat Jun 25 2016 - Thu Aug 11 2016

function mailCount(data) {
  let emails = data.split('##||##');
  let dates = emails.map(grabDates);
  dates.sort((a, b) => a - b);
  let earliest = dates[0].toDateString();
  let latest = dates.slice(-1)[0].toDateString();
  console.log(`Count of Email: ${emails.length}`);
  console.log(`Date Range: ${earliest} - ${latest}`);
}

function grabDates(email) {
  let date = email.split('#/#')[2].replace(/\n?Date: /, '');
  return new Date(date);
}

let emailData = "From: foo@bar.com#/#\nSubject: Nunc in justo eros. Aliquam.#/#\
Date: 07-27-2016#/#\nTo: foo@bar.com#/#\nEtiam convallis commodo tortor,\
dapibus auctor dolor semper consequat. Sed lobortis eros nec ante porta,\
eu placerat sapien interdum. Class aptent taciti sociosqu ad litora torquent\
per conubia nostra, per inceptos himenaeos. Morbi consectetur et odio vitae\
volutpat. Curabitur imperdiet orci metus, et dignissim nisl lacinia non.\
Aenean volutpat diam in lorem iaculis, sit amet volutpat nibh dictum.\
Quisque vel vulputate nisi. Nam a vestibulum turpis. Lorem ipsum dolor\
sit amet, consectetur adipiscing elit. Morbi interdum leo id velit aliquet,\
at vestibulum ipsum molestie. Cras eu lobortis libero. In rutrum non leo\
id ultricies. Aliquam in ex ut nibh placerat sollicitudin vitae id\
magna.##||##\n\nFrom: baz@foo.com#/#\nSubject: Aenean cursus velit non\
arcu.#/#\nDate: 08-11-2016#/#\nTo: baz@foo.com#/#\nCras ex leo, faucibus\
id mollis a, dignissim sit amet metus. Sed dui massa, mollis in tristique\
ut, auctor quis tortor. Donec egestas velit purus, eget laoreet urna\
venenatis id. Etiam eget ultrices tortor. Duis venenatis leo mi, non porta\
est molestie at. Nulla lacus nisl, dapibus convallis massa ut, dignissim\
euismod lacus. Ut vel magna lectus. Morbi sit amet vulputate arcu. Cras non ante arcu. Nam tempor iaculis ipsum eget tincidunt. Praesent imperdiet varius dui, vel egestas ipsum porta in. Sed suscipit massa in neque lobortis congue.##||##\n\nFrom: qux@bar.com#/#\nSubject: Sed hendrerit felis in ex.#/#\nDate: 06-25-2016#/#\nTo: qux@bar.com#/#\nNulla quis est vitae orci tincidunt convallis sit amet ut libero. Sed eu facilisis justo. Maecenas sed ultrices urna. Sed malesuada justo sed magna sodales, eget congue dolor convallis. Vestibulum vel consectetur nunc. Morbi at tincidunt turpis, eget imperdiet orci. Curabitur laoreet ipsum a quam facilisis, eu aliquet lectus viverra. Maecenas ullamcorper rutrum dui, ac aliquet mi pulvinar sit amet.##||##\n\nFrom: quux@foo.com#/#\nSubject: Curabitur tincidunt elit nec risus.#/#\nDate: 07-24-2016#/#\nTo: quux@foo.com#/#\nCurabitur interdum dictum consectetur. Nulla facilisi. Quisque sed tellus consectetur, vestibulum quam sed, lacinia mauris. Nunc risus dolor, feugiat nec erat at, elementum tempor urna. Vivamus facilisis elementum congue. Cras dui libero, vehicula eget porttitor sed, sagittis quis dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lacinia nulla nisi, vel finibus ligula sodales quis. Maecenas vulputate, leo auctor venenatis pretium, lectus elit eleifend odio, nec molestie ligula ex eget tellus. Nullam a nibh ut enim efficitur elementum. Nunc non elit vitae tortor iaculis ornare in id risus. Integer finibus lobortis lorem, id rutrum elit congue id. In hac habitasse platea dictumst.##||##\n\nFrom: garply@foo.com#/#\nSubject: Integer nec nunc facilisis, ultricies.#/#\nDate: 07-03-2016#/#\nTo: garply@foo.com#/#\nFusce rhoncus purus nisi, vel blandit felis fermentum sed. Vestibulum ultricies rutrum dui nec vehicula. Proin quis semper nulla. Maecenas congue, leo nec feugiat dapibus, dui metus facilisis elit, non finibus leo nisl at est. Donec varius, turpis non pulvinar sodales, nulla nulla posuere ligula, nec eleifend quam metus ut tortor. Sed semper vestibulum mattis. Nullam et ornare eros. Aliquam sed pellentesque dui, ut consequat neque. Integer luctus turpis ultrices, congue erat mattis, vehicula tellus. Pellentesque tincidunt posuere nibh pretium tincidunt. In hac habitasse platea dictumst.";
mailCount(emailData);

// const loginSuccess = (req, res, next) =>{
//   // Handle success
//   return res.json({ success: true, message: 'Logged in' });
// };
//
// const loginFailure = (err, req, res, next) => {
//   // Handle error
//   return res.status(401).json({ success: false, message: err });
// };
//
// const currentUser = (req, res) => {
//   return res.json(req.user);
// };
//
// const logout = (req, res) => {
//   req.session.destroy();
//   return res.json('Successfully destroyed session.');
// };
//
// module.exports = {
//   loginSuccess,
//   loginFailure,
//   currentUser,
//   logout
// };

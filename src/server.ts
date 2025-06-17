import app from './app';
const port = process.env.PORT || 65000;
app.listen(port, () => {
  console.log(`Api running on port 65000 ${port}`);
});
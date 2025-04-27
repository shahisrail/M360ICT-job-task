interface ErrorProps {
    message: string;
  }
  
  const Error = ({ message }: ErrorProps) => (
    <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
      Error: {message}
    </div>
  );
  
  export default Error;
  
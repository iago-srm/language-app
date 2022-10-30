export const TextContent = ({ text }) => {
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};

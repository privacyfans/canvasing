const MessageComponent = ({ message }) => {
  return <span dangerouslySetInnerHTML={{ __html: message }} />
}

export default MessageComponent

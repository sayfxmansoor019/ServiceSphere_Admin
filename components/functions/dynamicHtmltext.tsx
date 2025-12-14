
const dynamicHtmltext = ({ htmlContent }: any) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    ></div>
  )
}

export default dynamicHtmltext
export default function Logo() {
  return (
    <div className="flex justify-center">
      <img 
        src="/logo.jpeg" 
        alt="S3K Tech.ai Logo" 
        className="w-12 h-12 md:w-16 md:h-16 object-contain"
        onError={(e) => {
          e.target.style.display = 'none'
        }}
      />
    </div>
  )
}

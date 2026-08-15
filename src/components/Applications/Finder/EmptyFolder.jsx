import emptyFolderIcon from '../../../assets/icons/empty-folder.webp'

const EmptyFolder = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-black/35">
      <img src={emptyFolderIcon} alt="" className="h-14 w-14 object-contain" />
      <span className="text-[13px]">This folder is empty</span>
    </div>
  )
}

export default EmptyFolder

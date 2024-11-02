import {
  Avatar,
  AvatarFallback,
} from "./ui/avatar"

export function ProfileImage({ image, firstLetter }: { image: string, firstLetter: string }) {
  return (
    <Avatar>
      <img src={image} width={100} height={100} alt='Profile picture' />
      <AvatarFallback>{firstLetter}</AvatarFallback>
    </Avatar>
  )
}


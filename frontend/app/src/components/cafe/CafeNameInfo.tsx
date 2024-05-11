import {Cafe} from "../../api/cafeAPI.tsx";

type CafeInfoProps = {
  cafe: Cafe
}

export const CafeNameInfo: React.FC<CafeInfoProps> = ({cafe}) => {
  return (
    <div
      className="bg-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center flex justify-center items-center h-9">
      {cafe.name}
    </div>
  )
}

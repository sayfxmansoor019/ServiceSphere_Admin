import {useState} from 'react'
import {Tooltip } from 'reactstrap';

type TCustomTooltipProps = {
    id: string
    desp: string
}

const CustomTooltip = ({ id, desp }: TCustomTooltipProps) => {

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <Tooltip
        placement='right'
        isOpen={tooltipOpen}
        target={`Tooltip-${id}`}
        toggle={toggle}
      >
        <div className="text-left">{desp}</div>
    </Tooltip>
  )
}

export default CustomTooltip

import { Card, CardContent, Typography } from '@mui/material'
import './BasicInfoCard.css'
import { useNavigate } from 'react-router-dom'

type Props = {
  song: string
  artist: string
  album: string
  img: string
}

export default function BasicInfoCard(props: Props) {
  const navigate = useNavigate()
  return (
    <div
      className="wrapper"
      onClick={() => {
        navigate('/project2/' + props.artist + '/' + props.song, {
          state: {
            title: props.song,
            artist: props.artist,
            album: props.album,
            img: props.img,
            length: '3:57',
            credits: 'Kanye West, Eric Hudson',
            lyrics: 'Flashing Lights',
          },
        })
      }}
    >
      <Card variant="outlined" sx={{ width: 1, backgroundColor: 'white' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row' }}>
          <img className="albumCover" src={props.img} alt="Album cover" />
          <div>
            <Typography variant="h6" component="div">
              {props.song}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.artist}
            </Typography>
            <Typography variant="body2">{props.album}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

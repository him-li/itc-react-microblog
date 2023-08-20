import { CardGroup, Card } from 'react-bootstrap';

export default function TweetsList({ tweets, loading }) {
    return (
        <CardGroup className='d-flex flex-column'>
            {loading && (
                <Card className='bg-card p-2 my-2 w-100 rounded indicator' aria-hidden='true'>
                    <Card.Header className='d-flex justify-content-between align-items-center placeholder-glow'>
                        <Card.Title className='text-light placeholder col-1'></Card.Title>
                        <Card.Subtitle className='text-light placeholder col-1'></Card.Subtitle>
                    </Card.Header>
                    <Card.Body className='d-flex placeholder-glow'>
                        <Card.Text className='text-light placeholder col-6'></Card.Text>
                    </Card.Body>
                </Card>
            )}
            {tweets.map((tweet, index) => {
                return (
                    <Card className='bg-card p-2 my-2 w-100 rounded' key={index}>
                        <Card.Header className='d-flex justify-content-between align-items-center'>
                            <Card.Title className='fs-6 text-white-50'>{tweet.user}</Card.Title>
                            <Card.Subtitle className='fs-6 text-white-50'>{tweet.date}</Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className='text-light text-start'>{tweet.text}</Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </CardGroup>
    );
}
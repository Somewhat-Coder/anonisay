import VerificationEmailProps from '@/types/Email';
import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button
} from '@react-email/components';



export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html className=''>
            <Head />
            <Preview>Verify your Anonisay account email</Preview>
            <Section style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <Heading style={{ textAlign: 'center', color: '#333' }}>
                    Email Verification
                </Heading>
                <Row>
                    <Text style={{ marginTop: '20px', color: '#555', fontSize: '16px' }}>
                        Hi {username}!,
                    </Text>
                </Row>
                <Row>
                    <Text style={{ marginTop: '10px', color: '#555' }}>
                        Please use the following OTP to verify your email address:
                    </Text>
                </Row>
                <Row>
                    <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
                        {otp}
                    </Text>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Button
                        href="#"
                        style={{
                            backgroundColor: '#007BFF',
                            color: '#FFFFFF',
                            padding: '10px 20px',
                            textDecoration: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Verify Email
                    </Button>
                </Row>
            </Section>
        </Html>
    );
}
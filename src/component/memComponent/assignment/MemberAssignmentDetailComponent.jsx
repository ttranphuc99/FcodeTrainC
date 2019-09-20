import React from 'react'
import AssignmentService from '../../../service/AssignmentService';
import { Typography, Divider, Card } from 'antd';

class MemberAssignmentDetailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            redirect: false,
            isError: false,
            assignment: null
        }
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({isLoading: true});
        AssignmentService.getAssDetail(this.props.match.params.id)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                localStorage.setItem('loggedIn', false);
                this.setState({ redirecting: true });
            } else {
                this.setState({
                    isError: true
                })
            }
        }).then(data => {
            if (data != null) {
                console.log(data);
                this.setState({assignment: data})
            }
            this.setState({isLoading: false});
        })
    }

    render() {
        const { Title, Paragraph, Text } = Typography;

        return (
            <Card>
            {this.state.assignment !== null &&
                <Typography>
                    <Title style={{textAlign: 'center'}}>{this.state.assignment.title}</Title>
                    
                    <Divider/>

                    <Paragraph>
                        <div dangerouslySetInnerHTML={{ __html: this.state.assignment.content }} />
                    </Paragraph>

                    <Divider/>

                    <Text>
                        Creator: {this.state.assignment.creatorName} - @{this.state.assignment.creatorUsername}<br/>
                        Mark: {this.state.assignment.mark}<br/>
                        Submit quantity: {this.state.assignment.submitQuantity}
                    </Text>

                </Typography>
            }
            </Card>
        )
    }
}

export default MemberAssignmentDetailComponent

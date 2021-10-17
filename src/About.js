import React from "react";
import { useSelector } from 'react-redux';
import { TouchableOpacity, View, Text } from 'react-native';
import {
    Card,
    Title,
    Paragraph,
    List
} from "react-native-paper";

const DetailsScreen = (props) => {
    const user = useSelector(state => state.userReducer.user);
    return (
   
        <Card>
                <Card.Content>
                    <Title>Author: {user} </Title>
                    <Paragraph>
                        Software devloper with over four years of experience. I enjoy working with a team and have deep passion for learning and imparting knowledge.  
                    </Paragraph>
                   
                </Card.Content>
      
            </Card>
    );
};
  
export default DetailsScreen;
import React, { useState, useEffect } from 'react';

// Function to generate random color
const getRandomColor = () => {
    const colors = ['#AC1919', '#FFFFFF', '#000000']; // Red, White, Black
    return colors[Math.floor(Math.random() * colors.length)];
};

// Function to get initials from name
const getInitials = (name: string) => {
    const nameArray = name.trim().split(' ');
    if (nameArray.length === 1) {
        return nameArray[0].charAt(0).toUpperCase(); // Single name
    } else {
        return (
            nameArray[0].charAt(0).toUpperCase() +
            nameArray[nameArray.length - 1].charAt(0).toUpperCase()
        );
    }
};

interface ProfilePictureProps {
    name: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ name }) => {
    const [backgroundColor, setBackgroundColor] = useState<string>('');

    useEffect(() => {
        // Only set background color when component is mounted
        setBackgroundColor(getRandomColor());
    }, []);

    const initials = getInitials(name);

    return (
        <div
            style={{
                backgroundColor,
                color: backgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF', // Use black text for white background
                width: '144px',
                height: '144px',
                borderRadius: '50%', // Circular shape
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '48px',
                fontWeight: 'bold'
            }}
        >
            {initials}
        </div>
    );
};

export default ProfilePicture;

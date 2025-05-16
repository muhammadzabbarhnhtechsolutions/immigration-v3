import React from 'react';

interface StarRatingComponentProps {
    name: string;
    value: number;
    starCount?: number;
    onStarClick?: (nextValue: number, prevValue: number, name: string) => void;
    onStarHover?: (nextValue: number, prevValue: number, name: string) => void;
    onStarHoverOut?: (nextValue: number, prevValue: number, name: string) => void;
    renderStarIcon?: (nextValue: number, prevValue: number, name: string) => React.ReactNode | string;
    renderStarIconHalf?: (nextValue: number, prevValue: number, name: string) => React.ReactNode | string;
    starColor?: string;
    emptyStarColor?: string;
    editing?: boolean;
    starSize?: string | number; // Added prop to control the star size
}

const StarRatingComponent: React.FC<StarRatingComponentProps> = ({
    name,
    value,
    starCount = 5,
    onStarClick,
    onStarHover,
    onStarHoverOut,
    renderStarIcon,
    renderStarIconHalf,
    starColor = 'gold',
    emptyStarColor = 'grey',
    editing = true,
    starSize = '24px' // Default star size, you can change this value
}) => {
    const handleStarClick = (nextValue: number, prevValue: number) => {
        if (onStarClick && editing) {
            onStarClick(nextValue, prevValue, name);
        }
    };

    const handleStarHover = (nextValue: number, prevValue: number) => {
        if (onStarHover && editing) {
            onStarHover(nextValue, prevValue, name);
        }
    };

    const handleStarHoverOut = (nextValue: number, prevValue: number) => {
        if (onStarHoverOut && editing) {
            onStarHoverOut(nextValue, prevValue, name);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= starCount; i++) {
            const isHalfStar = renderStarIconHalf && value + 0.5 === i;
            const starIcon = isHalfStar ? renderStarIconHalf(i, value, name) : renderStarIcon ? renderStarIcon(i, value, name) : '★';

            stars.push(
                <span
                    key={i}
                    onClick={() => handleStarClick(i, value)}
                    onMouseOver={() => handleStarHover(i, value)}
                    onMouseOut={() => handleStarHoverOut(i, value)}
                    style={{
                        color: i <= value ? starColor : emptyStarColor,
                        cursor: editing ? 'pointer' : 'default',
                        fontSize: starSize // Set the size of the star here
                    }}
                >
                    {starIcon}
                </span>
            );
        }
        return stars;
    };

    return <div>{renderStars()}</div>;
};

export default StarRatingComponent;

import React from 'react'
import ProjectCard from './ProjectCard'
import BooksManagementLogo from '../../assets/book-management-system.png'
import RecipeSearchLogo from '../../assets/recipe-search.png'
import ShoppingCartLogo from '../../assets/shopping-website.png'
import OpticStoreLogo from '../../assets/optic-store.png'
import QuizAppLogo from '../../assets/quiz-app.png'

const Projects = () => {
  return (
    <div id='Projects' className='p-10 py-0 md:py-10 md:px-15 text-white'>
      <h1 className='text-2xl md:text-4xl text-white font-bold md:ml-14'>Personal Projects</h1>
      <div className='py-12 md:px-8 flex flex-wrap gap-5'>
        <ProjectCard title='Shopping Cart' logo={ShoppingCartLogo} demoLink='https://react-shopping-cart1996.netlify.app/' codeLink='https://github.com/saurabh918/shopping_cart' main='A shopping cart application where users can browse a list of products with the ability to apply various filters and search for specific items. Users can add products to the cart, adjust the quantity of items in the cart, and view the total cost based on the selected quantities. The application is built using React, with state management handled by useReducer and useContext.' />
        <ProjectCard title='Recipe search' logo={RecipeSearchLogo} demoLink='https://recipe-task.netlify.app/' codeLink='https://github.com/saurabh918/React-test2/tree/dev' main='A recipe search website where users are initially presented with a selection of default food items. Users can search for additional recipes using the search functionality and bookmark their favorite recipes for future reference. The application is built using React, React Redux Toolkit for state management, and Styled Components for styling.' />
        <ProjectCard title='Quiz App' logo={QuizAppLogo} demoLink='https://my-quiz-app-sg.netlify.app/' codeLink='https://github.com/saurabh918/quiz-app/tree/master' main='This project is a React-based quiz application inspired by the popular "Who Wants to Be a Millionaire?" game. Users can participate in a general knowledge quiz, progressing through increasingly valuable prizes for every correct answer. The application leverages robust state management to handle game logic and scoring, ensuring a smooth and dynamic user experience. Additionally, interactive sound effects are incorporated using specialized plugins, enhancing engagement and creating an immersive gameplay environment.' />
        <ProjectCard title='BookKeeper' logo={BooksManagementLogo} demoLink='https://book-management-system-react-redux.netlify.app/' codeLink='https://github.com/saurabh918/React-test' main='A book management website where users can view a table of books with features such as searching for books and sorting by any column in both ascending and descending order. Users can manage books with full CRUD functionality, including adding new books, editing and updating existing books, and deleting books. The application is built using React, React Redux Toolkit for state management, and Styled Components for styling.' />
        <ProjectCard title='Optic Store' logo={OpticStoreLogo} demoLink='https://react-with-tailwind1996.netlify.app/' codeLink='https://github.com/saurabh918/react-with-tailwind' main='An optic store website where users can browse a list of optic products, add them to the cart, and select the desired quantity. Users can view the total amount they have spent whenever they purchase products. For example, if a user buys a product with a quantity of 4, the total amount will be updated (e.g., $40). When they purchase another product with a different quantity, the new total will be added to the previous amount. The application is built using React JS with state management handled by useReducer and useContext, and Tailwind CSS is used for styling.' />
      </div>
    </div>
  )
}

export default Projects
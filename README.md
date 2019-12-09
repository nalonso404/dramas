# dramas

## Description

Página/aplicación donde un usuario se puede registrar, logear y editar su información de perfil.
El usuario podrá crear un animal (llama), con unas características predefinidas y otras editables y también podrá borrar su animal.
Finalmente el usuario se enfrentará a una batalla con el animal de otro usuario.

## MVP

## Routes
| Path |  | Permissions | Behavior |
| - | - | - | - |
| `/login` | LoginPage | public | Log in page |
| `/signup` | SignupPage | public | Sign up page |
| `/not-found` | NotFoundPage | public | Not found page |
| `/` | HomePage | user only | Home page |
| `User/:id` |  | user only | Información de perfil del User |
| `User/:id/edit` | | user only | Edición de la información del perfil |
| `animal/create` |  | user only | Creación del animal |
| `animal/:id/edit` | | user only | Edicion del animal |
| `animal/:id/delete` |  | user only | Borras tu animal |
| `game/:id` |  | user only | Interacción con el juego |
| `game/:id/winner` | | user only | Página resultado |
| `game/:id/loser` | | user only | Página resultado |


## Modelos:
Usuario
Animal
Pregunta

## Backlog
Añadir otro tipo de animal
Añadir preguntas
Añadir comportamiento del animal
Y muy futuro, dependiendo de las victorias y derrotas subida de experiencia del anima
Modelo Game



## Task
Backend
Estructura de modelos, estructura de formularios
Session
Validaciones
Html 
Css 



## Links

### Trello
[Link url](https://trello.com/b/noq1yTYS/dramas)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)

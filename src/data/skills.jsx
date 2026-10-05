import { JavaIcon, PythonIcon, CppIcon, CIcon, CSharpIcon, KotlinIcon, PhpIcon, NodeJsIcon, PostgresqlIcon, MysqlIcon, HtmlIcon, CssIcon, JavaScriptIcon, ReactIcon, ReactNativeIcon, TailwindIcon, BootstrapIcon, JsonIcon, DockerIcon, GitIcon, GithubIcon, LinuxIcon, BashIcon, ScrumIcon } from '../components/atoms/Icons';

export const skills = {
  backend: [
    { name: 'Java', icon: <JavaIcon size={32} /> },
    { name: 'Python', icon: <PythonIcon size={32} /> },
    { name: 'C++', icon: <CppIcon size={32} /> },
    { name: 'C', icon: <CIcon size={32} /> },
    { name: 'C#', icon: <CSharpIcon size={32} /> },
    { name: 'Kotlin', icon: <KotlinIcon size={32} /> },
    { name: 'PHP', icon: <PhpIcon size={32} /> },
    { name: 'Node.js', icon: <NodeJsIcon size={32} /> },
    { name: 'PostgreSQL', icon: <PostgresqlIcon size={32} /> },
    { name: 'MySQL', icon: <MysqlIcon size={32} /> },
  ],
  frontend: [
    { name: 'JavaScript', icon: <JavaScriptIcon size={32} /> },
    { name: 'React', icon: <ReactIcon size={32} /> },
    { name: 'React Native', icon: <ReactNativeIcon size={32} /> },
    { name: 'HTML5', icon: <HtmlIcon size={32} /> },
    { name: 'CSS3', icon: <CssIcon size={32} /> },
    { name: 'Tailwind', icon: <TailwindIcon size={32} /> },
    { name: 'Bootstrap', icon: <BootstrapIcon size={32} /> },
    { name: 'JSON', icon: <JsonIcon size={32} /> },
  ],
  devops: [
    { name: 'Docker', icon: <DockerIcon size={32} /> },
    { name: 'Git', icon: <GitIcon size={32} /> },
    { name: 'GitHub', icon: <GithubIcon size={32} /> },
    { name: 'Linux', icon: <LinuxIcon size={32} /> },
    { name: 'Bash', icon: <BashIcon size={32} /> },
    { name: 'Scrum', icon: <ScrumIcon size={32} /> },
  ],
};
from setuptools import find_packages, setup

with open('.version') as f:
    version = f.read().strip()


with open('requirements.txt') as f:
    requirements = []
    for line in f.readlines():
        striped_line = line.strip()
        if not striped_line.startswith('#'):
            requirements.append(striped_line)

setup(
    name='app_lib',
    description='Library using in app',
    version=version,
    packages=find_packages(),
    install_requires=requirements,
    python_requires=">=3.8",
    zip_safe=False,
)

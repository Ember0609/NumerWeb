from fastapi import FastAPI


app = FastAPI()

def db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return "helloworld"

@app.get("/examples/{exampletype}")
def get_example():
    query = text("select * from example where examples where exampletype")    
    result = 

    return example

